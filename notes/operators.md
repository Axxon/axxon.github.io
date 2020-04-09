### ?: vs ??

##?: Elvis operator
wiki =>  "a binary operator that returns its first operand if that operand evaluates to a true value, and otherwise evaluates and returns its second operand."

##?? = Null coalescing

```php
$user = $this->getUser() ?? $this->createGuestUser();

/* Equivalent to */

$user = $this->getUser();

if (null === $user) {
    $user = $this->createGuestUser();
}
```
In my IDE:
```
    private string $id;
    private string $aggregateId;
    private string $occurredAt;
    private array  $body;
    private string $name;

    protected function __construct(string $aggregateId, array $body, string $id = null, string $occurredAt = null)
    {
        $this->aggregateId = $aggregateId;
        $this->body        = $body;
        $this->id          = $id ?? (string) Uuid::random();
        $this->occurredAt  = $occurredAt ?: Utils::dateToString(new \DateTimeImmutable());
        $this->name        = $this->eventName();
    }
```
a warning message on $this->occurredAt line. 
"incompatibles type declaration." It seems that $occurredAt is affected to $this before to be evaluated for the final affectation choice. "
