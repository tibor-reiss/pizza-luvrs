CREATE TABLE IF NOT EXISTS pizzas(
	id text PRIMARY KEY,
	name text,
	toppings text,
	img text,
	username text,
	created bigint,
	"createdAt" timestamptz,
	"updatedAt" timestamptz
);

\set s3_bucket `echo $S3_BUCKET`
\set s3_region `echo $S3_REGION`
\set s3 '//':s3_bucket'.s3.':s3_region'.amazonaws.com/'

INSERT INTO pizzas (id, name, toppings, img, username, created, "createdAt", "updatedAt") VALUES ('Best-Pizza', 'Best Pizza', '["dough_crust","marinara_sauce","mozzarella_cheese","cheddar_cheese","mushrooms","pepperoni","banana_peppers","ham","green_peppers"]', CONCAT(:'s3', 'pizzas/best-pizza.png'), 'ryan', 1606765393999, NOW(), NOW()) ON CONFLICT DO NOTHING;
INSERT INTO pizzas (id, name, toppings, img, username, created, "createdAt", "updatedAt") VALUES ('Filthy-Rich', 'Filthy Rich', '["money"]', CONCAT(:'s3', 'pizzas/filthy-rich.png'), 'kathy', 1606765394001, NOW(), NOW()) ON CONFLICT DO NOTHING;
INSERT INTO pizzas (id, name, toppings, img, username, created, "createdAt", "updatedAt") VALUES ('Foul-Wizard', 'Foul Wizard', '["dough_crust","marinara_sauce","banana_peppers","rainbows","money"]', CONCAT(:'s3', 'pizzas/foul-wizard.png'), 'kathy', 1606765394001, NOW(), NOW()) ON CONFLICT DO NOTHING;
INSERT INTO pizzas (id, name, toppings, img, username, created, "createdAt", "updatedAt") VALUES ('Lazer-Pie', 'Lazer Pie', '["dough_crust","marinara_sauce","mozzarella_cheese","laser_beams"]', CONCAT(:'s3', 'pizzas/lazer-pie.png'), 'ryan', 1606765394001, NOW(), NOW()) ON CONFLICT DO NOTHING;
INSERT INTO pizzas (id, name, toppings, img, username, created, "createdAt", "updatedAt") VALUES ('Meat-Haters', 'Meat Haters', '["dough_crust","marinara_sauce","mozzarella_cheese","cheddar_cheese","mushrooms","banana_peppers","green_peppers"]', CONCAT(:'s3', 'pizzas/meat-haters.png'), 'ryan', 1606765394002, NOW(), NOW()) ON CONFLICT DO NOTHING;
INSERT INTO pizzas (id, name, toppings, img, username, created, "createdAt", "updatedAt") VALUES ('Red-Forever', 'Red Forever', '["dough_crust","marinara_sauce","mozzarella_cheese","pepperoni","ham"]', CONCAT(:'s3', 'pizzas/red-forever.png'), 'jim', 1606765394002, NOW(), NOW()) ON CONFLICT DO NOTHING;
