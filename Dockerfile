FROM mcr.microsoft.com/powershell:latest
WORKDIR /app
COPY . .
CMD ["pwsh", "-File", ""]
