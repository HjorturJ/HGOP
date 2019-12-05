# Configure the AWS Provider
# The provider needs to be configured with the proper credentials before it can be used
# Our credentials are stored in the credentials file
provider "aws" {
  shared_credentials_file = "~/.aws/credentials"
  region                  = "us-east-1"
}

# We are here creating security group
# and allowing access to port 3000 from anywhere 
# when using a TCP connection
resource "aws_security_group" "game_security_group" {
  name = "GameSecurityGroup"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Actually creating the aws instances of our server
# with the proper settings
resource "aws_instance" "game_server" {
  ami                    = "ami-0ac019f4fcb7cb7e6"
  instance_type          = "t2.micro"
  key_name               = "GameKeyPair"
  vpc_security_group_ids = [aws_security_group.game_security_group.id]
  tags = {
    Name = "GameServer"
  }

  # Copying initialize script into our server through ssh
  # so it can be used there
  provisioner "file" {
    source      = "scripts/initialize_game_api_instance.sh"
    destination = "/home/ubuntu/initialize_game_api_instance.sh"

    connection {
      host        = coalesce(self.public_ip, self.private_ip)
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("~/.aws/GameKeyPair.pem")
    }
  }

  # Copying docker compose up script into our server through ssh
  # so it can be used there
  provisioner "file" {
    source      = "scripts/docker_compose_up.sh"
    destination = "/home/ubuntu/docker_compose_up.sh"

    connection {
      host        = coalesce(self.public_ip, self.private_ip)
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("~/.aws/GameKeyPair.pem")
    }
  }

  # Copying docker-compose into our server through ssh
  # so it can be used there
  provisioner "file" {
    source      = "docker-compose.yml"
    destination = "/home/ubuntu/docker-compose.yml"

    connection {
      host        = coalesce(self.public_ip, self.private_ip)
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("~/.aws/GameKeyPair.pem")
    }
  }

  # This is used to run commands on the instance we just created.
  # Terraform does this by SSHing into the instance and then executing the commands.
  # Since it can take time for the SSH agent on machine to start up we let Terraform
  # handle the retry logic, it will try to connect to the agent until it is available
  # that way we know the instance is available through SSH after Terraform finishes.

  # Executing the chmod +x in our server on the local 
  # initialize script to make it executable
  provisioner "remote-exec" {
    inline = [
      "chmod +x /home/ubuntu/initialize_game_api_instance.sh",
      "chmod +x /home/ubuntu/docker_compose_up.sh"
    ]

    connection {
      host        = coalesce(self.public_ip, self.private_ip)
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("~/.aws/GameKeyPair.pem")
    }
  }

# Returning our server public ip from this script
output "public_ip" {
  value = aws_instance.game_server.public_ip
}