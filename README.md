## Demo Project for AWS Developer: Getting Started

This original repository contains the demo project for the [AWS Developer: Getting Started course on Pluralsight.com](http://www.pluralsight.com/courses/aws-developer-getting-started).

The original repository: https://github.com/ryanmurakami/pizza-luvrs

## Modifications

The original repo was copied and modified to dynamically handle all the AWS services (S3, dynamodb, RDS), i.e. the service configurations are managed via environment variables. A new CloudFormation (CF) template was created including VPC Endpoints for S3, DynamoDB - also fully dynamic. The only requirement to launch the CF stack is to have an EC2 key pair and an AMI image.

### How to run the CF stack:
* launch an EC2 instance
* create an EC2 key pair (which should be also used for the CF stack)
* create an AMI from this EC2
  * log in to the EC2 instance
  * install necessary packages
```bash
sudo yum install git
sudo yum install postgresql postgresql-contrib
curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -
sudo yum install nodejs npm
```
  * clone the repo into /home/ec2-user/pizza
```bash
cd /home/ec2-user
git clone https://github.com/tibor-reiss/pizzaaaaaa.git ./pizza
```
  * install the app
```bash
cd /home/ec2-user/pizza
npm install
```
* launch the CloudFormation stack with the template cloudformation/pizza.template

### How to test on the public EC2 (assuming the necessary AWS infrastructure - RDS, S3, DynamoDB - is already in place based on the course):
* above steps under "create an AMI from this EC2" have been completed
* export all the necessary environment variables
```bash
export PIZZA_PASS=<your_RDS_password>
export PIZZA_HOST=<your_RDS_host_name>
export PIZZA_USER=<your_RDS_user_name>
export PIZZA_DB=<your_RDS_db_name>
export DYNDB_USERS=<your_dynamodb_users_table_name>
export DYNDB_TOPPINGS=<your_dynamodb_toppings_table_name>
export S3_BUCKET=<your_s3_bucket_name>
export S3_REGION=<your_s3_region>
```
* create the RDS table and fill it with some defaults
```bash
cd /home/ec2-user/pizza
./cloudformation/create_pizza_table_bash
```
* create the statically linked file versions using the environment variables
```bash
cd /home/ec2-user/pizza/cloudformation
./replace_hbs
```
* start the app
```bash
cd /home/ec2-user/pizza
npm start
```

## Project Explanation

Pizza Luvrs is a social network for people who love pizza. Users can create accounts, create pizzas, and share them with others.

![Pizza Luvrs](assets/pizza_shot.png)

## Known Issues

None at this time.

Found one? Please let me know by opening an [issue](https://github.com/ryanmurakami/pizza-luvrs/issues)!

## License

All Images copyright Ryan Lewis

All Code under MIT license

