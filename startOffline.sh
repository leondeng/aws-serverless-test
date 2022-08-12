#!/bin/bash
TMPFILE=/var/tmp/offline$$.log
# TMPDynamoFILE=/var/tmp/dynamo$$.log
if [ -f .offline.pid ]; then
  echo "Found file .offline.pid. Not starting."
  exit 1
fi

# serverless dynamodb start -s test &> $TMPDynamoFILE &
# while ! grep “Dynamodb Local Started” $TMPDynamoFILE
# do sleep 1; done
# wait for migration data
# while ! grep “Serverless: DynamoDB — created table” $TMPDynamoFILE
# do sleep 1; done
sls offline start &> $TMPFILE &
PID=$!
echo $PID > .offline.pid

while ! grep "Server ready" $TMPFILE
do sleep 1; done

rm $TMPFILE
# rm $TMPDynamoFILE
