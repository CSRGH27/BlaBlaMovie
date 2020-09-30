<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200930130002 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE favorite_movie (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, poster LONGTEXT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, pseudo VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, birthdate DATE NOT NULL, created_at DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_favorite_movie (user_id INT NOT NULL, favorite_movie_id INT NOT NULL, INDEX IDX_C0530612A76ED395 (user_id), INDEX IDX_C053061225C4AE0D (favorite_movie_id), PRIMARY KEY(user_id, favorite_movie_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user_favorite_movie ADD CONSTRAINT FK_C0530612A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_favorite_movie ADD CONSTRAINT FK_C053061225C4AE0D FOREIGN KEY (favorite_movie_id) REFERENCES favorite_movie (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user_favorite_movie DROP FOREIGN KEY FK_C053061225C4AE0D');
        $this->addSql('ALTER TABLE user_favorite_movie DROP FOREIGN KEY FK_C0530612A76ED395');
        $this->addSql('DROP TABLE favorite_movie');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE user_favorite_movie');
    }
}
