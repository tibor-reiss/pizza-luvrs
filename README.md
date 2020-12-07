## Update to existing repository

The original repository: https://github.com/ryanmurakami/pizza-luvrs
It was modified to dynamically handle all the AWS services, e.g. S3, dynamodb, RDS, i.e. the service configurations are managed via environment variables. A new cloudformation template was created including VPC Endpoints for S3, DynamoDB - also fully dynamic. The only requirement is to have an EC2 key pair and an AMI image.

## Demo Project for AWS Developer: Getting Started

This repository contains the demo project for the [AWS Developer: Getting Started course on Pluralsight.com](http://www.pluralsight.com/courses/aws-developer-getting-started).

## Project Explanation

Pizza Luvrs is a social network for people who love pizza. Users can create accounts, create pizzas, and share them with others.

![Pizza Luvrs](assets/pizza_shot.png)

## Known Issues

None at this time.

Found one? Please let me know by opening an [issue](https://github.com/ryanmurakami/pizza-luvrs/issues)!

## License

All Images copyright Ryan Lewis

All Code under MIT license

