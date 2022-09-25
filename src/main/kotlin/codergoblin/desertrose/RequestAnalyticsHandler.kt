package codergoblin.desertrose

import io.javalin.http.Context
import io.javalin.http.Handler
import java.lang.System.currentTimeMillis
import java.time.Duration
import java.time.LocalDateTime
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.atomic.AtomicLong

class RequestAnalyticsHandler : Handler {

    private val printInterval = Duration.ofHours(12).toMillis()
    private val ips = HashSet<String>();
    private val requestCounter = ConcurrentHashMap<String, AtomicLong>();
    private var lastUpdate = currentTimeMillis()

    override fun handle(ctx: Context) {
        ips.add(ctx.req.remoteAddr)
        requestCounter.computeIfAbsent(ctx.req.pathInfo) { AtomicLong() }.incrementAndGet()

        val now = currentTimeMillis()
        if (lastUpdate + printInterval < now) {
            println("${LocalDateTime.now()}: Analytics report:\nunique ips: ${ips.size}\n")
            requestCounter.forEach {
                println("'${it.key}' -> ${it.value.get()}")
            }
            println("---------------")
            lastUpdate = now
        }
    }

}
