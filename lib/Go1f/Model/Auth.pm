package Go1f::Model::Auth;

use strict;
use warnings;

use Mojo::Base 'MojoX::Model';

use feature 'signatures';
no warnings 'experimental::signatures';

sub user_get_p( $self, $login ) {

    $self->app->pg->query_p(
        '
        SELECT name, login, avatar_url FROM users WHERE login = ?
        ',
        $login,
    )->then(
        sub {
            my $dbh = shift;

            $dbh->hash;
        }
    );
}

1
