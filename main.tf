terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  backend "s3" {
    bucket = "biddist-state"
    region = "us-east-2"
    key = "biddist/state"
  }
}
provider "aws" {
  region = "us-east-2"
}
resource "aws_s3_bucket" "frontend_bucket" {
  bucket = "biddist-frontend"
  lifecycle {
    prevent_destroy = true
  }
}
resource "aws_s3_bucket" "backend_bucket" {
  bucket = "biddist-backend"
  lifecycle {
    prevent_destroy = true
  }
}