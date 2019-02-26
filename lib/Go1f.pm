package Go1f;
use Mojo::Base 'Mojolicious';

use Mojo::Pg;
use Mojo::Pg::Migrations;

# This method will run once at server start
sub startup {
    my $app = shift;

    # Load configuration from hash returned by "my_app.conf"
    my $config = $app->plugin('Config');

    # Router
    my $r = $app->routes;

    my $ng_services = $r->get('/ng-services');

    $ng_services->get('/config-service')->to( 'config_service#shared_settings' );

    # Github oauth callback url
    $r->get('/github/oauth')->to( 'github#oauth_callback' );

    # Page with angular2 bundle
    $r->get( '/#ng-route' => sub { shift->reply->static( 'ng-go1f/index.html' )})
        # placeholder becomes optional
        ->to( 'ng-route' => '/' );

    my $db = Mojo::Pg->new($config->{postgresql}{url})
        ->migrations
        ->from_file('./etc/migrations.sql')
        ->migrate();

    $app->attr(
        pg => sub { Mojo::Pg->new($config->{postgresql}{url})->db },
    );

}

1;
