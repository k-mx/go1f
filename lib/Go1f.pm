package Go1f;
use Mojo::Base 'Mojolicious';

use Mojo::Pg;

# This method will run once at server start
sub startup {
  my $app = shift;

  # Load configuration from hash returned by "my_app.conf"
  my $config = $app->plugin('Config');

  # Documentation browser under "/perldoc"
  $app->plugin('PODRenderer') if $config->{perldoc};

  # Router
  my $r = $app->routes;

  # Page with angular2 bundle
  $r->get('/' => sub { shift->reply->static( 'ng-go1f/index.html' ) });

	$app->attr(
		pg => sub { Mojo::Pg->new($config->{postgresql}{url})->db }
	);
}

1;
