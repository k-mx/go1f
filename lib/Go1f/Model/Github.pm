package Go1f::Model::Github;

use strict;
use warnings;

use feature 'signatures';
no warnings 'experimental::signatures';

use Mojo::Base 'MojoX::Model';

use List::Util qw(first);

sub new_access_token_p ( $self, $code, $state ) {

    my $app        = $self->app;
    my $github_cfg = $app->config->{github};

    $app->ua->post_p(
        'https://github.com/login/oauth/access_token',
        {
            Accept => 'application/json',
        },
        json => {
            code  => $code,
            state => $state,
            $github_cfg->%{qw/ client_id client_secret /},
        }
    )->then(
        sub {
            my $tx = shift;

            # TODO check results;

            $tx->res->json->{access_token}
        }
    )
}

sub user_create_p ( $self, $access_token ) {

    my $ua = $self->app->ua;

    my $emails_p = $ua->get_p(
        'https://api.github.com/user/emails',
        {
            Accept         => 'application/json',
            Authorization  => "token $access_token",
        },
     );

     my $user_p = $ua->get_p(
        'https://api.github.com/user',
        {
            Accept         => 'application/json',
            Authorization  => "token $access_token",
        },
     );

     Mojo::Promise->all( $emails_p, $user_p )->then(
        sub {
            my ( $emails_tx, $user_tx ) = @_;

            my ( $emails, $user ) = map { $_->[0]->res->json } ( $emails_tx, $user_tx );

            my $email = first { $_->{primary} } $emails->@*;
            $email = $email->{email};

            $self->app->pg->query_p(
                '
                INSERT INTO users ( name, login, avatar_url, email, access_token )
                VALUES ( ?, ?, ?, ?, ? )
                RETURNING login
                ',
                $user->@{qw/ name login avatar_url /}, $email, $access_token,
            );
        }
    )->then(
        sub {
            my $dbh = shift;

            $dbh->hash->{login};
        }
    );
}

1
