package Go1f::Controller::ConfigService;

use Mojo::Base 'Mojolicious::Controller';

sub shared_settings {
    my $c = shift;

    my $client_id = $c->app->config->{github}{client_id};

    $c->render( json => { github_client_id => $client_id }  );
}

1
