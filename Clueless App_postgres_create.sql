CREATE DATABASE closet_app;

CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL
);

CREATE TABLE "garments" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"garment_name" varchar NOT NULL,
	"garment_type" varchar NOT NULL,
	"image_path" varchar NOT NULL,
	"comfort_level" int NOT NULL,
	"temp_min" int NOT NULL,
	"temp_max" int NOT NULL,
	CONSTRAINT garments_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "garment_properties" (
	"id" serial NOT NULL,
	"garment_id" int NOT NULL,
	"property" varchar NOT NULL,
	CONSTRAINT garment_properties_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "garment_season" (
	"id" serial NOT NULL,
	"garment_id" int NOT NULL,
	"property" varchar NOT NULL,
	CONSTRAINT garment_season_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "saved_outfits" (
	"id" serial NOT NULL,
	"top_id" int NOT NULL,
	"bottom_id" int NOT NULL,
	"user_id" int NOT NULL,
	"notes" varchar NOT NULL,
	"min_temp" int NOT NULL,
	"max_temp" int NOT NULL,
	CONSTRAINT saved_outfits_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "outfit_properties" (
	"id" serial NOT NULL,
	"outfit_id" int NOT NULL,
	"property" varchar NOT NULL,
	CONSTRAINT outfit_properties_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "good_for" (
	"id" serial NOT NULL,
	"outfit_id" int NOT NULL,
	"occasion" varchar NOT NULL,
	CONSTRAINT good_for_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "outfit_season" (
	"id" serial NOT NULL,
	"outfit_id" int NOT NULL,
	"season" varchar NOT NULL,
	CONSTRAINT outfit_season_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "garments" ADD CONSTRAINT "garments_fk0" FOREIGN KEY ("user_id") REFERENCES "person"("id");

ALTER TABLE "garment_properties" ADD CONSTRAINT "garment_properties_fk0" FOREIGN KEY ("garment_id") REFERENCES "garments"("id");

ALTER TABLE "garment_season" ADD CONSTRAINT "garment_season_fk0" FOREIGN KEY ("garment_id") REFERENCES "garments"("id");

ALTER TABLE "saved_outfits" ADD CONSTRAINT "saved_outfits_fk0" FOREIGN KEY ("top_id") REFERENCES "garments"("id");
ALTER TABLE "saved_outfits" ADD CONSTRAINT "saved_outfits_fk1" FOREIGN KEY ("bottom_id") REFERENCES "garments"("id");
ALTER TABLE "saved_outfits" ADD CONSTRAINT "saved_outfits_fk2" FOREIGN KEY ("user_id") REFERENCES "person"("id");

ALTER TABLE "outfit_properties" ADD CONSTRAINT "outfit_properties_fk0" FOREIGN KEY ("outfit_id") REFERENCES "saved_outfits"("id");

ALTER TABLE "good_for" ADD CONSTRAINT "good_for_fk0" FOREIGN KEY ("outfit_id") REFERENCES "saved_outfits"("id");

ALTER TABLE "outfit_season" ADD CONSTRAINT "outfit_season_fk0" FOREIGN KEY ("outfit_id") REFERENCES "saved_outfits"("id");

