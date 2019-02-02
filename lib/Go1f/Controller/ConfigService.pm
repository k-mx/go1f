package Go1f::Controller::ConfigService;

use Mojo::Base 'Mojolicious::Controller';

sub shared_settings {
    my $c = shift;

    my $cfg = $c->app->config;

    $c->render( json => {
        github => {
            $cfg->{github}->%{qw/ client_id /},
        },

    });
}

1
