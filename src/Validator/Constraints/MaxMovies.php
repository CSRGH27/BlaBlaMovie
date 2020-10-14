<?php

namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;


/**
 * @Annotation
 */
class MaxMovies extends Constraint
{

    public $message = 'Vous avez deja ajoute 3 films en favori !!';
}
