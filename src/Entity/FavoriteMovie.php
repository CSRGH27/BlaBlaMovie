<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\FavoriteMovieRepository;
use App\Validator\MaxMovies;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;



/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=FavoriteMovieRepository::class)
 * @UniqueEntity(
 *      fields={"idmovie", "user"},
 *      errorPath="idmovie",
 *      message="Vous avez deja ajoute ce film a vos favoris")
 */
class FavoriteMovie
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $title;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $poster;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $idmovie;

    /**
     * @MaxMovies
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="favoriteMovies")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getPoster(): ?string
    {
        return $this->poster;
    }

    public function setPoster(?string $poster): self
    {
        $this->poster = $poster;

        return $this;
    }

    public function getIdmovie(): ?string
    {
        return $this->idmovie;
    }

    public function setIdmovie(string $idmovie): self
    {
        $this->idmovie = $idmovie;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
