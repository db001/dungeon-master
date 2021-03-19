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

CREATE TABLE player_characters(
  character_id UUID DEFAULT uuid_generate_v4(),
  dnd_beyond_ref INT,
  player_initiative INT NOT NULL,
  player_dex INT NOT NULL,
  player_armour_class INT NOT NULL,
  player_hit_points INT NOT NULL,
  PRIMARY KEY (character_id)
);

CREATE TABLE dm_players(
  dm_id UUID,
  character_id UUID,
  FOREIGN KEY (dm_id) REFERENCES dungeon_master(dm_id),
  FOREIGN KEY (character_id) REFERENCES player_characters(character_id)
);

CREATE TABLE npcs(
  npc_id UUID DEFAULT uuid_generate_v4(),
  npc_initiative INT NOT NULL,
  npc_dex INT NOT NULL,
  npc_armour_class INT NOT NULL,
  npc_hit_points INT NOT NULL,
  PRIMARY KEY (npc_id)
);

CREATE TABLE dm_npcs (
  dm_id UUID,
  npc_id UUID,
  FOREIGN KEY (dm_id) REFERENCES dungeon_master(dm_id),
  FOREIGN KEY (npc_id) REFERENCES npcs(npc_id)
);
