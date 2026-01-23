import amqp from 'amqplib';

let channel: amqp.Channel;

export const connectRabbitHQ = async () => {
try {
    const connection = await amqp.connect({
        protocol: "amqp",
        hostname: process.env.Rabbitmq_Host,
        port: 5672,
        username: process.env.Rabbitmg_Username,
        password: process.env.Rabbitmg_Password,
    });

    channel = await connection.createChannel()

    console.log("✅Connected to rabbitmq");
 } catch (error) {
    console. log("Failed to connect to rabbitma", error);
 }
};

export const publishToQueue = async (queueName: string, message: any) => {
  if (!channel) {
    console. log("Rabbitmq channel is not initalized");
    return;
  }

  await channel.assertQueue(queueName, { durable: true });

  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
  persistent: true,
  });
}