FROM python:3.10

WORKDIR /app

COPY ./requirements.txt /app/requirements.txt

RUN apt-get update

RUN apt-get -y install libgl1-mesa-glx

RUN apt-get -y install tesseract-ocr

RUN pip install --upgrade pip

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

COPY . .

EXPOSE 8060

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8060"]
