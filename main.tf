terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "eu-west-2"
}

resource "aws_instance" "app_server" {
  ami           = "ami-01f10c2d6bce70d90"
  instance_type = "t2.micro"
  key_name      = "chat-gpt-key-pair"

  tags = {
    Name = "fred-dexter-chatgpt"
  }
}