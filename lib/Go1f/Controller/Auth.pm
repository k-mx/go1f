package Go1f::Controller::Auth;

use strict;
use warnings;

use Mojo::Base 'Mojolicious::Controller';

sub auth {
    my $c = shift;

    my $login  = $c->session('login');

    my $auth = $c->app->model('auth');

    $c->render_later;

    $auth->user_get_p($login)->then(
        sub {
            my $user_data = shift;

            $c->render( json => $user_data );
        }
    );

}


1
