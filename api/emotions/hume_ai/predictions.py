import base64
from dataclasses import dataclass, field
from io import BytesIO
from typing import Any, Dict, List, Optional

from PIL import Image, ImageDraw


@dataclass
class Emotion:
    name: Optional[str]
    score: Optional[float]


@dataclass
class Box:
    x: float
    y: float
    w: float
    h: float


@dataclass
class Face:
    id: str
    frame: Optional[str]
    time: Optional[str]
    prob: Optional[float]
    box: Optional[Box]
    emotions: List[Emotion]
    facs: Optional[Dict[str, float]]
    descriptions: Optional[str]

    @classmethod
    def from_response(cls, face_predictions: Dict):
        faces = []
        for face_preds in face_predictions["grouped_predictions"]:
            face_obj = Face(id= face_preds["id"], **face_preds["predictions"][0])
            face_obj.box = Box(**face_preds["predictions"][0]["box"])
            sorted_emotions = sorted(face_preds["predictions"][0]["emotions"], key=lambda x: x['score'], reverse=True)
            face_obj.emotions = list(map(lambda x: Emotion(**x), sorted_emotions))
            faces.append(face_obj)
        return faces

@dataclass
class Results:
    image_file: str
    faces: Optional[List[Face]] = field(default_factory=list)
    errors: Optional[List] = field(default_factory=list)

    @classmethod
    def from_response(cls, image_file, response: List) -> 'Results':
        result_obj = Results(image_file=image_file)

        results_dict = response[0]["results"]
        predictions_dict = results_dict["predictions"][0]["models"]["face"]

        result_obj.errors = results_dict["errors"]
        result_obj.faces = Face.from_response(predictions_dict)
        return result_obj
    
    def draw_rectangles(self):
        image = Image.open(self.image_file).convert('RGBA')
        draw = ImageDraw.Draw(image)
        if self.faces:
            for face in self.faces:
                if face.box is not None:
                    rectangle = [(face.box.x, face.box.y), (face.box.x + face.box.w, face.box.y + face.box.h)]
                    draw.rectangle(rectangle, outline="red", width=3)
                    draw.text((face.box.x, face.box.y), text=face.id)
        buffered = BytesIO()
        image.save(buffered, format="PNG")
        image_base64 = base64.b64encode(buffered.getvalue())

        return image_base64
    
