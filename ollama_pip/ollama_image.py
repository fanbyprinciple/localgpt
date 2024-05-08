import ollama

with open('image.jpeg', 'rb') as file:
    response = ollama.chat(
        model='llava',
        messages=[
            {
                'role': 'user',
                'content':  'What is strange about this image?',
                'images': [file.read()],
            },
        ],
    )

print(response['message']['content'])