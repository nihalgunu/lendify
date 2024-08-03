// main.go
package main

import (
	"context"
	"fmt"
	"log"

	"github.com/segmentio/kafka-go"
)

func main() {
	// Define Kafka broker address and topic
	brokerAddress := "localhost:9092"
	topic := "transactions"
	groupID := "consumer-group-1"

	// Create a new Kafka reader
	reader := kafka.NewReader(kafka.ReaderConfig{
		Brokers: []string{brokerAddress},
		Topic:   topic,
		GroupID: groupID,
	})

	// Consume messages
	for {
		msg, err := reader.ReadMessage(context.Background())
		if err != nil {
			log.Fatalf("could not read message: %v", err)
		}
		fmt.Printf("Received message: %s\n", string(msg.Value))
		processTransaction(msg.Value)
	}
}

// processTransaction processes the transaction message
func processTransaction(message []byte) {
	fmt.Printf("Processing transaction: %s\n", string(message))
	// Implement your data processing logic here
}
