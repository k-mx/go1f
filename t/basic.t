use Mojo::Base -strict;

use Test::More;
use Test::Mojo;

my $t = Test::Mojo->new('Go1f');

is(
  $t->app->pg->query('select 42')->text,
  "42\n",
  'postgres was successfully queried '
);

done_testing();
