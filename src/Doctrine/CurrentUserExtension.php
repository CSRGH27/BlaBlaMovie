<?php

namespace App\Doctrine;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use Doctrine\ORM\QueryBuilder;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\FavoriteMovie;
use Symfony\Component\Security\Core\Security;

class CurrentUserExtension  implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security =$security;
    }

/**
 * Permet de reformuler la query doctrine quand on demande les film favori on obtint que ceux de luser connecte
 *
 * @param QueryBuilder $queryBuilder
 * @param string $resourceClass
 * @return void
 */
    private function AddWhere(QueryBuilder $queryBuilder, string $resourceClass){
        $user= $this->security->getUser();

        if ($resourceClass == FavoriteMovie::class ) {
            $rootAlias = $queryBuilder->getRootAliases()[0];
            $queryBuilder->andWhere("$rootAlias.user = :user")
            ->setParameter("user", $user);
            
        }
    }


    /**
     * Pour une collection
     *
     * @param QueryBuilder $queryBuilder
     * @param QueryNameGeneratorInterface $queryNameGenerator
     * @param string $resourceClass
     * @param string|null $operationName
     * @return void
     */
    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, ?string $operationName = null)
    {
        $this->AddWhere($queryBuilder, $resourceClass);
    }


    /**
     * POur un resultat unique
     *
     * @param QueryBuilder $queryBuilder
     * @param QueryNameGeneratorInterface $queryNameGenerator
     * @param string $resourceClass
     * @param array $identifiers
     * @param string|null $operationName
     * @param array $context
     * @return void
     */
    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, ?string $operationName = null, array $context = [])
    {
        $this->AddWhere($queryBuilder, $resourceClass);
    }
    
}
