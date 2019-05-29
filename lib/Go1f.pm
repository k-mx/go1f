package Go1f;

use Mojo::Base 'Mojolicious';
use Mojo::Pg;

# This method will run once at server start
sub startup {
    my $app = shift;

    $app->plugin('Model');

    $app->ua
        # TODO to constants/config
        ->max_redirects(0)
        ->connect_timeout(3)
        ->request_timeout(5);

    # Load configuration from hash returned by "my_app.conf"
    my $config = $app->plugin('Config');

    # Router
    my $r = $app->routes;

    my $ng_services = $r->get('/ng-services');

    $ng_services->get('/config-service')->to( 'config_service#shared_settings' );
    $ng_services->get('/github/oauth-state')->to( 'github#oauth_state' );
    $ng_services->get('/auth')->to( 'auth#auth' );

    # Github oauth callback url
    $r->get('/github/oauth')->to( 'github#oauth_callback' );


    # Page with angular2 bundle
    $r->get( '/#ng-route' => sub { shift->reply->static( 'ng-go1f/index.html' )})
        # Placeholder becomes optional
        ->to( 'ng-route' => '/' );

    my $db = Mojo::Pg->new($config->{postgresql}{url});

    $db->migrations->from_file( $app->home->rel_file('./etc/migrations.sql') );

    # You can use migrations this way:
    # ./script/go1f eval 'app->db->migrations->migrate()'
    $app->attr(
        db => sub { $db },
    );

    $app->attr(
        pg => sub { $app->db->db },
    );

}

1;
