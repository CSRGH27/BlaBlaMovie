<?php

use EasyCorp\Bundle\EasyDeployBundle\Deployer\DefaultDeployer;

return new class extends DefaultDeployer
{


    public function configure()
    {
        return $this->getConfigBuilder()
            ->server('django')
            ->deployDir('/var/www/blablamovie')
            ->symfonyEnvironment('test')
            ->sharedFilesAndDirs(['var/log', '.env'])
            ->repositoryUrl('git@github.com:CSRGH27/BlaBlaMovie.git')
            ->repositoryBranch('develop');
    }


    public function beforeStartingDeploy()
    {
    }

    public function beforeFinishingDeploy()
    {
        //$this->runRemote('sudo service php7.3-fpm restart');
    }
};
