<?php

namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;


/**
 * @Annotation
 */
final class MaxMoviesValidator extends ConstraintValidator
{

    public function validate($value, Constraint $constraint): void
    {
        dd($value);
    }
}
