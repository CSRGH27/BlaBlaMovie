<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;




/**
 * @ApiResource
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @UniqueEntity("username", message="Un utilisateur avec le meme pseudo existe deja")
 */
class User implements UserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * 
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Assert\NotBlank(message="Le pseudo doit etre renseigne")
     * @Assert\Length(min=3, minMessage="Le pseudo doit faire au moins 3 caracteres",
     *                max=10, maxMessage="Le pseudo doit faire au maximum 10 caracteres" )
     */
    private $username;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     * @Assert\NotBlank(message="Le mot de passe doit etre renseigne")
     */
    private $password;

    /**
     * @ORM\ManyToMany(targetEntity=FavoriteMovie::class, inversedBy="users")
     */
    private $favoritesMovies;

    public function __construct()
    {
        $this->favoritesMovies = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    /**
     * @return Collection|FavoriteMovie[]
     */
    public function getFavoritesMovies(): Collection
    {
        return $this->favoritesMovies;
    }

    public function addFavoritesMovie(FavoriteMovie $favoritesMovie): self
    {
        if (!$this->favoritesMovies->contains($favoritesMovie)) {
            $this->favoritesMovies[] = $favoritesMovie;
        }

        return $this;
    }

    public function removeFavoritesMovie(FavoriteMovie $favoritesMovie): self
    {
        if ($this->favoritesMovies->contains($favoritesMovie)) {
            $this->favoritesMovies->removeElement($favoritesMovie);
        }

        return $this;
    }
}
