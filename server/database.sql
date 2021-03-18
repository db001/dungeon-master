-- CREATE DATABASE dungeon;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; 

CREATE TABLE dungeon_master(
  dm_id UUID DEFAULT uuid_generate_v4(),
  dm_name VARCHAR(255) NOT NULL,
  dm_email VARCHAR(255) NOT NULL UNIQUE,
  dm_password VARCHAR(255) NOT NULL,
  PRIMARY KEY (dm_id)
);

CREATE TABLE campaigns(
  campaign_id UUID DEFAULT uuid_generate_v4(),
  campaign_name VARCHAR(255) NOT NULL,
  dm_id UUID,
  PRIMARY KEY (campaign_id),
  FOREIGN KEY (dm_id) REFERENCES dungeon_master(dm_id)
);