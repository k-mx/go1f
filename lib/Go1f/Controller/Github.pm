package Go1f::Controller::Github;

use Mojo::Base 'Mojolicious::Controller';
use feature 'postderef';

sub oauth_callback {
    my $c = shift;


    $c->render( json => $c->req->params->to_hash );
}

1
