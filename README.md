# CREATING A LOCAL GPT FOR DOCUMENTS

1. Need to install docker from text_generation_inference

model=HuggingFaceH4/zephyr-7b-beta
volume=$PWD/data # share a volume with the Docker container to avoid downloading weights every run

docker run --gpus all --shm-size 1g -p 8080:80 -v $PWD/data:/data ghcr.io/huggingface/text-generation-inference:1.4 --model-id HuggingFaceH4/zephyr-7b-beta