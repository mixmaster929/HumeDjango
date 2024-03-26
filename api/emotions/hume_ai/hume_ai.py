import os
from typing import Tuple

from django.conf import settings
from hume import HumeBatchClient
from hume.models.config import FaceConfig

from .predictions import Results


class HumeAPI:

    def __init__(self, api_key: str) -> None:
        self.client = HumeBatchClient(api_key)

    def parse_image(self, file_name: str) -> Tuple[str, Results]:
        configs = [FaceConfig(identify_faces=True)]
        file_path = os.path.join(settings.MEDIA_ROOT + "/" + file_name)
        job = self.client.submit_job([], configs, files=[file_path])

        print("Running Job")
        job.await_complete()

        print("Getting Predictions")
        predictions = Results.from_response(image_file=file_path, response=job.get_predictions())
        return job.id, predictions