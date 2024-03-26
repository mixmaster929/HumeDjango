import base64
import json
from io import BytesIO
from typing import Dict

import requests
from channels.exceptions import StopConsumer
from channels.generic.websocket import AsyncWebsocketConsumer
from hume import HumeStreamClient
from hume.models.config import FaceConfig, ProsodyConfig

from .hume_ai import Face


def res_to_face(res_dict: Dict):
    res_dict["box"] = res_dict.pop("bbox")
    res_dict["id"] = res_dict.pop("face_id")
    return res_dict

client = HumeStreamClient("9qrnabcLfniBOgBF8iyhu21pcAwCXv4sTIB7ose7V7ShJuFn")

class VideoConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        raise StopConsumer()

    async def send_image(self, socket, data):
        frame_base64 = data.get('frame', '')
        binary_image = bytes(frame_base64, 'utf-8')
        response = await socket.send_bytes(binary_image)
        return response
    
    async def receive(self, text_data):
        data = json.loads(text_data)
        is_image = data.get("frame")
        config = FaceConfig(identify_faces=True) if is_image else ProsodyConfig()

        async with client.connect([config]) as socket:
            if is_image:
                response = await self.send_image(socket, data)
                if predictions := response["face"].get("predictions"):
                    for face in predictions:
                        face["emotions"] = sorted(face["emotions"], key=lambda x: x['score'], reverse=True)
            else:
                audio_file = data.get("audio")
                response = await socket.send_file(audio_file)
        await self.send(text_data=json.dumps({"predictions": response}))