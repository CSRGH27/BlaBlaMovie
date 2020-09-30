<?php

namespace App\Controller;


use Symfony\Contracts\HttpClient\HttpClientInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class FrontController extends AbstractController
{
    private $client;

    public function __construct(HttpClientInterface $client)
    {
        $this->client = $client;
    }


    /**
     * Get movie with bundle httpClient and omdbApi
     *
     * @Route("/" , name="app")
     * @return void
     */
    public function getMovies()
    {
        $apiKeys = $this->getParameter('app.api_omdb_key');
        $baseUri = "http://www.omdbapi.com/";
        $response = $this->client->request('GET', $baseUri . '?apikey=' . $apiKeys . '&type=movie&s=digital&school');




        return $this->render(
            'app/index.html.twig',
            ['test' => $apiKeys]
        );
    }
}
