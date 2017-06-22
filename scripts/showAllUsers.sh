mongo <<-EOF
use ledger
db.users.find({}).toArray()
EOF