<?php

namespace App\DataPersister;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\FavoriteMovie;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\Security\Core\Security;

class FavoriteMovieUserSubscriber implements EventSubscriberInterface
{
    private $security;
    private $em;

    public function __construct(EntityManagerInterface $em, Security $security)
    {
        $this->security = $security;
        $this->em = $em;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setUserForFavoriteMovie', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setUserForFavoriteMovie(ViewEvent $event)
    {
        $favoriteMovie = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if ($favoriteMovie instanceof FavoriteMovie && $method === 'POST') {
            $user = $this->security->getUser();
            $favoriteMovie->setUser($user);
        }
    }
}
