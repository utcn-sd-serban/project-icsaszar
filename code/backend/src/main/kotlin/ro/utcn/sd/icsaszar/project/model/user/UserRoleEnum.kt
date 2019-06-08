package ro.utcn.sd.icsaszar.project.model.user

import java.sql.SQLException
import org.hibernate.HibernateException
import org.hibernate.engine.spi.SharedSessionContractImplementor
import org.hibernate.type.EnumType
import java.sql.PreparedStatement
import java.sql.Types


class PostgreSQLRoleEnumType : EnumType<UserRole>() {

    @Throws(HibernateException::class, SQLException::class)
    override fun nullSafeSet(
            st: PreparedStatement,
            value: Any?,
            index: Int,
            session: SharedSessionContractImplementor?) {
        if (value == null) {
            st.setNull(index, Types.OTHER)
        } else {
            st.setObject(
                    index,
                    value.toString(),
                    Types.OTHER
            )
        }
    }
}