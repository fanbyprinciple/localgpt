# CREATING A LOCAL GPT FOR DOCUMENTS

1. Need to install docker from text_generation_inference

model=HuggingFaceH4/zephyr-7b-beta
volume=$PWD/data # share a volume with the Docker container to avoid downloading weights every run

docker run --gpus all --shm-size 1g -p 8080:80 -v $PWD/data:/data ghcr.io/huggingface/text-generation-inference:1.4 --model-id HuggingFaceH4/zephyr-7b-beta


curl 127.0.0.1:8080/generate_stream \ -X POST \ -d '{"inputs":"What is Deep Learning?","parameters":{"max_new_tokens":20}}' \ -H 'Content-Type: application/json'

not able to install docker.

