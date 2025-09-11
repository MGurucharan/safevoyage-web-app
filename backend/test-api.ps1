# PowerShell script to test AI summarization endpoint
Write-Host "=== Testing AI Summarization Endpoint ===" -ForegroundColor Green

$headers = @{
    "Content-Type" = "application/json"
}

# Test 1: Sample endpoint
Write-Host "`n1. Testing Sample Endpoint..." -ForegroundColor Cyan
$uri = "http://localhost:5000/api/ai/sample/hotel"
Write-Host "URL: $uri" -ForegroundColor Yellow

try {
    $response = Invoke-RestMethod -Uri $uri -Method Get -Headers $headers
    Write-Host "✅ Sample endpoint works!" -ForegroundColor Green
    Write-Host "Summary: $($response.data.summary)"
    Write-Host "Ratings:"
    $response.data.ratings.PSObject.Properties | ForEach-Object {
        $stars = "⭐" * $_.Value + "☆" * (5 - $_.Value)
        Write-Host "  $($_.Name): $stars ($($_.Value)/5)"
    }
} catch {
    Write-Host "❌ Sample endpoint failed:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

# Test 2: Real summarization endpoint
Write-Host "`n2. Testing Real Summarization..." -ForegroundColor Cyan

$reviews = @(
    @{
        id = 1
        author = "John Doe"
        rating = 5
        comment = "Amazing hotel with excellent service and beautiful rooms!"
        date = "2024-08-20"
    },
    @{
        id = 2
        author = "Jane Smith"
        rating = 4
        comment = "Great location and clean facilities. Staff was very helpful."
        date = "2024-08-15"
    }
)

$summarizeBody = @{
    reviews = $reviews
    type = "hotel"
    name = "Test Hotel"
} | ConvertTo-Json -Depth 10

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/ai/summarize" -Method POST -Headers $headers -Body $summarizeBody
    Write-Host "✅ AI Summarization works!" -ForegroundColor Green
    Write-Host "Summary: $($response.data.summary)"
    Write-Host "Ratings:"
    $response.data.ratings.PSObject.Properties | ForEach-Object {
        $stars = "⭐" * $_.Value + "☆" * (5 - $_.Value)
        Write-Host "  $($_.Name): $stars ($($_.Value)/5)"
    }
} catch {
    Write-Host "❌ AI Summarization failed:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    if ($_.Exception.Response) {
        $statusCode = [int]$_.Exception.Response.StatusCode
        Write-Host "Status Code: $statusCode" -ForegroundColor Red
    }
}

Write-Host "`n=== AI Tests Complete ===" -ForegroundColor Green
        
        $verifyResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/digital-id/verify" -Method POST -Headers $headers -Body $verifyBody
        
        Write-Host "`n=== Verification Result ===" -ForegroundColor Yellow
        Write-Host "Success: $($verifyResponse.success)"
        Write-Host "Verified: $($verifyResponse.verified)"
        Write-Host "Message: $($verifyResponse.message)"
        
        if ($verifyResponse.verified) {
            Write-Host "✅ VERIFICATION SUCCESSFUL - Digital ID is valid!" -ForegroundColor Green
        } else {
            Write-Host "❌ VERIFICATION FAILED" -ForegroundColor Red
            Write-Host "Reason: $($verifyResponse.reason)"
        }
        
    } else {
        Write-Host "❌ Generation failed: $($response.error)" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Test failed: $($_.Exception.Message)" -ForegroundColor Red
}
