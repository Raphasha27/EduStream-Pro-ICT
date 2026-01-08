library(plumber)

#* @filter cors
function(res) {
  res$setHeader("Access-Control-Allow-Origin", "*")
  res$setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  res$setHeader("Access-Control-Allow-Headers", "Content-Type")
  plumber::forward()
}

#* @apiTitle EduStream Academic Research API

#* Returns a summary of academic performance statistics
#* @get /summary
function() {
  # Mock data generation
  scores <- rnorm(100, mean = 75, sd = 10)
  scores <- pmax(0, pmin(100, scores))
  
  list(
    mean = mean(scores),
    median = median(scores),
    sd = sd(scores),
    p25 = quantile(scores, 0.25)[[1]],
    p75 = quantile(scores, 0.75)[[1]],
    count = length(scores)
  )
}

#* Check health
#* @get /health
function() {
  list(status = "R Statistical Engine is Healthy")
}

# Run the API on port 8001
# pr <- plumb("report.R")
# pr$run(port=8001)
