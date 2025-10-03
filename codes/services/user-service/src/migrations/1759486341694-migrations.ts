import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1759486341694 implements MigrationInterface {
    name = 'Migrations1759486341694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project_members" ("id" SERIAL NOT NULL, "role" character varying(50) NOT NULL, "projectId" integer, "userId" integer, CONSTRAINT "PK_0b2f46f804be4aea9234c78bcc9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "billing_log" ("id" SERIAL NOT NULL, "cost" double precision NOT NULL, "tokens" double precision NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "agentId" integer, CONSTRAINT "PK_7edbd2d13488ba454a956a80c85" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "agents" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "type" character varying(20) NOT NULL, "api_endpoint" character varying(200) NOT NULL, "config_json" json NOT NULL, "model_source" character varying(50) NOT NULL, "training_config" json, "version" character varying(20) NOT NULL, "active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9c653f28ae19c5884d5baf6a1d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" SERIAL NOT NULL, "user_message" text NOT NULL, "agent_response" text NOT NULL, "attachments" json, "tokens_used" double precision NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "conversationId" integer, "userId" integer, "agentId" integer, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "conversations" ("id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "metadata" json, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "projectId" integer, CONSTRAINT "PK_ee34f4f7ced4ec8681f26bf04ef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" integer, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "phone" character varying(20), "auth_provider" character varying(50), "role" character varying(50) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "project_members" ADD CONSTRAINT "FK_d19892d8f03928e5bfc7313780c" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_members" ADD CONSTRAINT "FK_08d1346ff91abba68e5a637cfdb" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "billing_log" ADD CONSTRAINT "FK_c34ef752d0aeb2f5887d019833e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "billing_log" ADD CONSTRAINT "FK_bf36dfc2f5a24970cd30af2f2d2" FOREIGN KEY ("agentId") REFERENCES "agents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_e5663ce0c730b2de83445e2fd19" FOREIGN KEY ("conversationId") REFERENCES "conversations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_5dda89467a452df8c5f9597bb8d" FOREIGN KEY ("agentId") REFERENCES "agents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "conversations" ADD CONSTRAINT "FK_76250cc6578e6ac4f924483c0c6" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_a8e7e6c3f9d9528ed35fe5bae33" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_a8e7e6c3f9d9528ed35fe5bae33"`);
        await queryRunner.query(`ALTER TABLE "conversations" DROP CONSTRAINT "FK_76250cc6578e6ac4f924483c0c6"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_5dda89467a452df8c5f9597bb8d"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_e5663ce0c730b2de83445e2fd19"`);
        await queryRunner.query(`ALTER TABLE "billing_log" DROP CONSTRAINT "FK_bf36dfc2f5a24970cd30af2f2d2"`);
        await queryRunner.query(`ALTER TABLE "billing_log" DROP CONSTRAINT "FK_c34ef752d0aeb2f5887d019833e"`);
        await queryRunner.query(`ALTER TABLE "project_members" DROP CONSTRAINT "FK_08d1346ff91abba68e5a637cfdb"`);
        await queryRunner.query(`ALTER TABLE "project_members" DROP CONSTRAINT "FK_d19892d8f03928e5bfc7313780c"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TABLE "conversations"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "agents"`);
        await queryRunner.query(`DROP TABLE "billing_log"`);
        await queryRunner.query(`DROP TABLE "project_members"`);
    }

}
