package com.ontimize.songslists.model.core.dao;


import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;


@Lazy
@Repository(value = "UserDao")
@ConfigurationFile(
	configurationFile = "dao/UserDao.xml",
	configurationFilePlaceholder = "dao/placeholders.properties")
public class UserDao extends OntimizeJdbcDaoSupport {

	//public static final String USR_EMAIL    = "email_user";
	//public static final String USR_PASSWORD = "password_user";

	public static final String ID            = "user_";
	public static final String EMAIL         = "email_user";
	public static final String PASSWORD      = "password_user";
	public static final String NAME          = "name_user";
	public static final String SURNAME       = "surname_user";
	public static final String BIRTHDAY      = "birthdate_user";
	public static final String SCHEMA        = "db_schema";
	public static final String CREATION_DATE = "user_creation_date";
	public static final String DOWN_DATE     = "user_down_date";

}
