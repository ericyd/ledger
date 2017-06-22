#!/bin/bash

while [ true ]
do
		echo "Do you really want to delete all users? This CANNOT be undone! (y/n) "
		read answer
		if [ "$answer" == "y" ] || [ "$answer" == 'Y' ]
		then
				# answered yes, go for it
				echo "deleting all users..."
				# single line commands can be run inline with the --eval flag, e.g.
				# mongo --eval "printjson(db.ledger.users.find().toArray())"
				# https://stackoverflow.com/questions/4837673/how-to-execute-mongo-commands-through-shell-scripts
				# but multiline requests need a 'here document'
				# and unfortunately here documents in scripts require tab indentation and a '-' prefix,
				# https://stackoverflow.com/questions/18660798/here-document-gives-unexpected-end-of-file-error
				mongo <<-EOF
				use ledger
				db.users.remove({})
				EOF


				break
		elif [ "$answer" == "n" ] || [ "$answer" == 'N' ]
		then
				# answered no, cancel
				echo "No worries, just run this file again if you change your mind."
				echo
				break
		else 
				echo -n "didn't understand... "
		fi
done