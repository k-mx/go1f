package Go1f::Controller::Github;

use Mojo::Base 'Mojolicious::Controller';
#use feature 'postderef';

use String::Random qw( random_string );

use constant {
    STATE_LEN => 12,
};

sub oauth_callback {
    my $c = shift;

    #$c->model('github');
    my $oauth_state = $c->session('oauth_state') // '';
    my $params      = $c->req->params->to_hash;

    foreach my $needed (qw/ state code /) {

        my $param = $params->{$needed} //= '';

        if ( length( $param ) == 0 ) {

            return $c->render(
                text => "Need $needed!",
                code => 403,
            );
        }
    }

    # If the states doesn't match, the request was created by a third party and
    # the process should be aborted.
    unless ( $oauth_state eq $params->{state} ) {

            return $c->render(
                text => "OAuth sates do not match!",
                code => 403,
            );
    }

    $c->session( oauth_state => '' );

    $c->render_later;

    my $github = $c->app->model('github');

    $github->new_access_token_p(

        $params->@{qw/ code state /}

    )->then(
        sub {
            my $access_token = shift;

            $github->user_create_p( $access_token );
        }
    )->then(
        sub {
            my $login = shift;

            $c->session( login => $login );

            $c->redirect_to( '/' );
        }
    )->catch(
        sub {
            # TODO better error checking
            $c->render( text => shift );
        }
    );
}

sub oauth_state {
    my $c = shift;

    my $state = random_string( 's' x STATE_LEN );

    $c->session( oauth_state => $state );

    $c->render( text => $state );
}

1
