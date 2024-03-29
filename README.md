# RabbitMQ

Perceived benefits of the topic-based communication compared to request-response (HTTP):
 * RabbitMQ makes using microservices easy. RabbitMQ handles the messages and passing them forward, so the nodes do not need to know eachother. That adds to scalability, since you    can just add new nodes to listen to the messages and this should not affect the other nodes at all (if you do not send incorrect messages).
 * The topic based communication seemed interesting, because you can selectively choose what topics you are interested in. This is not possible in the http.
 * RabbitMQ makes less calls between the nodes, since you do not have to respond to the request.
 * RabbitMQ is asynchronous, and you can put the messages in the queue to wait and not process them immediatelly.

Main learnings:
 * I learned to use Docker more efficiently. There were multiple containers that needed configuring and they all needed to work in a network. For example I learned Docker volumes,    and had to dive in more deeply to the Docker to understand some of it's core mechanics.
 * Message broker technology was new to me. I learned the concept of it and learned how to use RabbitMQ in NodeJS.
 * Addional coding skills in NodeJS, since the task needed creating multiple microservices
