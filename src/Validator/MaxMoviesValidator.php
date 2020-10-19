<?php

namespace App\Validator;

use App\Entity\FavoriteMovie;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

/**
 * @Annotation
 */
class MaxMoviesValidator extends ConstraintValidator
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    
    }

    public function validate($value, Constraint $constraint)
    {
        
        $movies = $this->em->getRepository(FavoriteMovie::class)->countFavFilmPerUser($value);
        
        if ($movies[1] >= 3) {
            
            $this->context->buildViolation($constraint->message)->addViolation();
            
        }
    }
}
