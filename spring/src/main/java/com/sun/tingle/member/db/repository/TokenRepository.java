package com.sun.tingle.member.db.repository;

import com.sun.tingle.member.db.entity.TokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepository extends JpaRepository<TokenEntity, Long> {
}
