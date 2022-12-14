package codergoblin.desertrose

import com.sksamuel.hoplite.ConfigLoaderBuilder
import com.sksamuel.hoplite.addCommandLineSource
import com.sksamuel.hoplite.fp.getOrElse
import com.sksamuel.hoplite.sources.SystemPropertiesPropertySource
import io.javalin.Javalin
import io.javalin.http.staticfiles.Location.CLASSPATH

fun main(args: Array<String>) {
    val config = ConfigLoaderBuilder.default()
        .addCommandLineSource(args)
        .addPropertySource(SystemPropertiesPropertySource())
        .build()
        .loadConfig<DRConfig>()
        .getOrElse { DRConfig() }

    println("Starting server: $config")

    val registry = CsvRegistry(config)

    val server = Javalin.create {
        it.enableCorsForAllOrigins()
        it.addStaticFiles("/static", CLASSPATH)
    }
    server.before(RequestAnalyticsHandler())
    server.get("/api/posts") {
        it.jsonStream(Result(registry.categories, registry.posts))
    }
    server.start(config.port)
}

data class Result(val categories: Collection<Category>, val posts: Collection<Post>)