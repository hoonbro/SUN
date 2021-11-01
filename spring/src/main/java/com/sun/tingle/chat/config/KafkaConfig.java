package com.sun.tingle.chat.config;


import com.google.common.collect.ImmutableMap;
import com.sun.tingle.chat.dto.ChatMessageResponseDto;
import com.sun.tingle.chat.entity.ChatMessage;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.LongDeserializer;
import org.apache.kafka.common.serialization.LongSerializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.*;
import org.springframework.kafka.support.serializer.JsonDeserializer;
import org.springframework.kafka.support.serializer.JsonSerializer;

import java.util.Map;

@EnableKafka
@Configuration
public class KafkaConfig {
    @Bean
    public ProducerFactory<String, ChatMessageResponseDto> producerFactory() {
        return new DefaultKafkaProducerFactory<>(producerConfigurations(), null, new JsonSerializer<ChatMessageResponseDto>());
    }

    @Bean
    public KafkaTemplate<String, ChatMessageResponseDto> kafkaTemplate() {
        return new KafkaTemplate<>(producerFactory());
    }

    @Bean
    public Map<String, Object> producerConfigurations() {

        return ImmutableMap.<String, Object>builder()
                .put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "kafka:9092")
                .put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, LongSerializer.class)
                .put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class)
                .put(ConsumerConfig.GROUP_ID_CONFIG, "spring-boot-test")
                .build();
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, ChatMessageResponseDto> kafkaListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, ChatMessageResponseDto> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory());
        return factory;
    }

    @Bean
    public ConsumerFactory<String, ChatMessageResponseDto> consumerFactory() {
        return new DefaultKafkaConsumerFactory<>(consumerConfigs(), null, new JsonDeserializer<>(ChatMessageResponseDto.class));
    }

    @Bean
    public Map<String, Object> consumerConfigs() {
        return ImmutableMap.<String, Object>builder()
                .put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "kafka:9092")
                .put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, LongDeserializer.class)
                .put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class)
                .put(ConsumerConfig.GROUP_ID_CONFIG, "spring-boot-test")
                .build();
    }
}
